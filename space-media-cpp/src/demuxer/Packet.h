#pragma once

#include <cstdint>
#include <memory>
#include <vector>

using namespace std;

namespace SpaceMedia
{
  class Packet
  {
    public:
      size_t pts() const { return m_pts; }
      const shared_ptr<vector<shared_ptr<vector<shared_ptr<const uint8_t>>>>> data() const { return m_data; }
      void addData(shared_ptr<vector<shared_ptr<const uint8_t>>> data);

    private:
      size_t m_pts;
      shared_ptr<vector<shared_ptr<vector<shared_ptr<const uint8_t>>>>> m_data;
  };
}